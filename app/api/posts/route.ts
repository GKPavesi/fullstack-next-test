import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    try {
        const data = await prisma.post.findMany()

        return new NextResponse(JSON.stringify(data), { status: 200 })

    }
    catch(error){
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}

type postProps = {
    title: string
    content?: string
    published?: boolean
}

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    try {
        const data: postProps = await req.json()

        console.log('bati no post')

        if (!data.title) {
            return new NextResponse(JSON.stringify({'message': 'Please do not leave title empty'}), { status: 400 })
        }

        const insertData = await prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                published: data.published
            }
        })

        return new NextResponse(JSON.stringify(data), { status: 200 })

    }
    catch(error){
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}