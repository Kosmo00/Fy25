import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'


async function authorizeByRole(request: NextRequest){
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
}

export async function middleware(request: NextRequest) {
  // console.log(request.method, request.nextUrl.pathname, 'params: ',  request.nextUrl.basePath)
  await authorizeByRole(request)
  return NextResponse.next()
}
 
export const config = {
  matcher: '/api/:path*',
}

