import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

function createLog(){

}

async function authorizeByRole(request: NextRequest){
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
}

export async function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  await authorizeByRole(request)
  return NextResponse.next()
}
 
export const config = {
  matcher: '/api/:path*',
}

