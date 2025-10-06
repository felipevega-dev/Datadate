import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Código no proporcionado' }, { status: 400 });
    }

    // Nota: En producción, deberías ejecutar Python en el servidor o usar Pyodide en el cliente
    // Por ahora, retornamos un placeholder que será procesado en el cliente
    return NextResponse.json({ 
      success: true,
      output: '', // Se ejecutará en el cliente con Pyodide
      code: code
    });

  } catch (error) {
    console.error('Error ejecutando Python:', error);
    return NextResponse.json({ 
      error: 'Error al ejecutar el código Python'
    }, { status: 500 });
  }
}

