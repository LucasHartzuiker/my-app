import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const tabs = await prisma.tab.findMany();
  return Response.json(tabs);
}

export async function POST(req: Request) {
  const data = await req.json();
  const tab = await prisma.tab.create({ data });
  return Response.json(tab);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const tab = await prisma.tab.update({
    where: { id: data.id },
    data: { title: data.title, content: data.content },
  });
  return Response.json(tab);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.tab.delete({ where: { id } });
  return Response.json({ success: true });
}