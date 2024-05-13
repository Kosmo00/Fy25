import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const role_non_authorized_routes = {
  'athlethe': [
    '/api/payment/athlethe-assistance',
    '/api/users/create',
    '/api/users/list'
  ],
  'admin': [

  ],
  'trainer': [
    '/api/payment/athlethe-assistance',
    '/api/users/create'
  ],
  'reception': [

  ],
  'qr-scanner': [
    '/api/users/create',
    '/api/users/list'
  ]
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

