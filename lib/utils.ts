import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCalendar(calendar: string[]): string {
  return calendar.map((day, i) => `${i + 1}. ${day}`).join('\n')
}

export function generatePDF(content: any) {
  if (typeof window === 'undefined') return

  const jsPDF = require('jspdf')
  const doc = new jsPDF.default()

  doc.setFontSize(16)
  doc.text('Pacote de Conteúdo', 20, 20)

  doc.setFontSize(12)
  let y = 40

  if (content.calendar) {
    doc.text('Calendário Semanal:', 20, y)
    y += 10
    content.calendar.forEach((day: string, i: number) => {
      doc.setFontSize(10)
      doc.text(`${i + 1}. ${day}`, 25, y)
      y += 7
    })
    y += 10
  }

  if (content.posts) {
    doc.setFontSize(12)
    doc.text('Posts Gerados:', 20, y)
    y += 10

    content.posts.forEach((post: any, i: number) => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }

      doc.setFontSize(11)
      doc.text(`Post ${i + 1}: ${post.title}`, 25, y)
      y += 7

      doc.setFontSize(9)
      const lines = doc.splitTextToSize(post.text, 160)
      doc.text(lines, 25, y)
      y += lines.length * 5 + 10
    })
  }

  doc.save('contentpack.pdf')
}
