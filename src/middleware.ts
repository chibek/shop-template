import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()

  return res
}