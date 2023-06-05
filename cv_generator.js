document.getElementById('generate-btn').addEventListener('click', generateCV);

async function generateCV() {
    // Create an object representing your CV data
    const cvData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        education: 'Bachelor of Science in Computer Science',
        work_experience: 'Software Developer at XYZ Company',
        skills: ['JavaScript', 'HTML', 'CSS'],
    };

    // Create a new PDF document
    const pdfDoc = await PDFLib.PDFDocument.create();

    // Add a page to the PDF
    const page = pdfDoc.addPage();

    // Set the font and font size
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const fontSize = 12;

    // Define the CV content
    const cvContent = `CV
    Name: ${cvData.name}
    Email: ${cvData.email}

    Education:
    ${cvData.education}

    Work Experience:
    ${cvData.work_experience}

    Skills:
    ${cvData.skills.join(', ')}`;

    // Add the CV content to the page
    const textWidth = font.widthOfTextAtSize(cvContent, fontSize);
    const textHeight = font.heightAtSize(fontSize);
    page.drawText(cvContent, {
        x: (page.getWidth() - textWidth) / 2,
        y: page.getHeight() - 50 - textHeight,
        size: fontSize,
        font: font,
    });

    // Serialize the PDF document
    const pdfBytes = await pdfDoc.save();

    // Convert the PDF data to a Base64-encoded string
    const pdfDataUri = `data:application/pdf;base64,${btoa(
        String.fromCharCode(...new Uint8Array(pdfBytes))
    )}`;

    // Display the PDF on the webpage
    const cvContainer = document.getElementById('cv-container');
    cvContainer.innerHTML = `<embed src="${pdfDataUri}" width="100%" height="600px" type="application/pdf" />`;
}
