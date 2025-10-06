import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Código no proporcionado' }, { status: 400 });
    }

    // JavaScript se ejecutará directamente en el cliente por seguridad
    // Este endpoint es principalmente para validación
    return NextResponse.json({ 
      success: true,
      code: code
    });

  } catch (error) {
    console.error('Error procesando JavaScript:', error);
    return NextResponse.json({ 
      error: 'Error al procesar el código JavaScript'
    }, { status: 500 });
  }
}

