import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  increment,
  Timestamp,
  arrayUnion
} from 'firebase/firestore';
import { db } from './firebase';

export interface UserProgress {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  completedLessons: number[];
  currentLesson: number;
  totalXP: number;
  certificates: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface LessonCompletion {
  lessonId: number;
  completedAt: Timestamp;
  xpEarned: number;
  objectivesCompleted: number;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string;
  totalXP: number;
  completedLessons: number;
}

// XP por completar lección
const XP_PER_LESSON = 100;
const XP_PER_OBJECTIVE = 20;

/**
 * Crear o actualizar perfil de usuario
 */
export async function createUserProfile(
  userId: string,
  email: string,
  displayName: string,
  photoURL?: string
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      userId,
      email,
      displayName,
      photoURL: photoURL || null,
      completedLessons: [],
      currentLesson: 1,
      totalXP: 0,
      certificates: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  } else {
    // Actualizar solo foto y nombre si cambió
    await updateDoc(userRef, {
      displayName,
      photoURL: photoURL || null,
      updatedAt: Timestamp.now()
    });
  }
}

/**
 * Obtener progreso del usuario
 */
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return userSnap.data() as UserProgress;
}

/**
 * Marcar lección como completada
 */
export async function completLesson(
  userId: string,
  lessonId: number,
  objectivesCount: number
): Promise<number> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error('User profile not found');
  }

  const userData = userSnap.data() as UserProgress;
  
  // Si ya completó esta lección, no dar XP de nuevo
  if (userData.completedLessons.includes(lessonId)) {
    return 0;
  }

  const xpEarned = XP_PER_LESSON + (objectivesCount * XP_PER_OBJECTIVE);

  // Actualizar perfil de usuario
  await updateDoc(userRef, {
    completedLessons: arrayUnion(lessonId),
    currentLesson: lessonId + 1,
    totalXP: increment(xpEarned),
    updatedAt: Timestamp.now()
  });

  // Guardar registro de completación
  const completionRef = doc(collection(db, 'users', userId, 'completions'));
  await setDoc(completionRef, {
    lessonId,
    completedAt: Timestamp.now(),
    xpEarned,
    objectivesCompleted: objectivesCount
  } as LessonCompletion);

  // Verificar si debe obtener certificado
  await checkAndAwardCertificates(userId, userData.completedLessons.length + 1);

  return xpEarned;
}

/**
 * Verificar y otorgar certificados
 */
async function checkAndAwardCertificates(userId: string, completedCount: number): Promise<void> {
  const userRef = doc(db, 'users', userId);
  
  // Certificado SQL Básico (lecciones 1-5)
  if (completedCount >= 5) {
    await updateDoc(userRef, {
      certificates: arrayUnion('sql-basico')
    });
  }
  
  // Certificado SQL Intermedio (lecciones 1-10)
  if (completedCount >= 10) {
    await updateDoc(userRef, {
      certificates: arrayUnion('sql-intermedio')
    });
  }
  
  // Certificado SQL Avanzado (lecciones 1-18)
  if (completedCount >= 18) {
    await updateDoc(userRef, {
      certificates: arrayUnion('sql-avanzado')
    });
  }
}

/**
 * Obtener leaderboard global
 */
export async function getLeaderboard(limitCount: number = 50): Promise<LeaderboardEntry[]> {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('totalXP', 'desc'), limit(limitCount));
  
  const querySnapshot = await getDocs(q);
  const leaderboard: LeaderboardEntry[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as UserProgress;
    leaderboard.push({
      userId: data.userId,
      displayName: data.displayName,
      photoURL: data.photoURL,
      totalXP: data.totalXP,
      completedLessons: data.completedLessons.length
    });
  });

  return leaderboard;
}

/**
 * Obtener posición del usuario en el leaderboard
 */
export async function getUserRank(userId: string): Promise<number> {
  const usersRef = collection(db, 'users');
  const userDoc = await getDoc(doc(db, 'users', userId));
  
  if (!userDoc.exists()) {
    return -1;
  }

  const userData = userDoc.data() as UserProgress;
  const q = query(usersRef, orderBy('totalXP', 'desc'));
  const querySnapshot = await getDocs(q);
  
  let rank = 1;
  for (const docSnap of querySnapshot.docs) {
    if (docSnap.id === userId) {
      return rank;
    }
    rank++;
  }
  
  return -1;
}

