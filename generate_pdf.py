from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.cell(200, 10, txt="Sai - Senior Frontend Developer", ln=1, align="C")
pdf.cell(200, 10, txt="This is a placeholder resume.", ln=2, align="C")
pdf.output("d:/Sai Protfolio/public/resume.pdf")
print("PDF generated successfully")
