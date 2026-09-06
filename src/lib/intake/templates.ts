import type { ApplicationInput, InquiryInput } from "./types";

function escape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function nl2br(str: string): string {
  return escape(str).replace(/\n/g, "<br>");
}

export function applicationHtml(input: ApplicationInput): string {
  const position = escape(input.jobTitle || input.jobId);
  const linkedinLink = input.linkedin
    ? `<p><strong>LinkedIn:</strong> <a href="${encodeURI(input.linkedin)}">${escape(input.linkedin)}</a></p>`
    : "";
  const phoneRow = input.phone
    ? `<p><strong>Phone:</strong> ${escape(input.phone)}</p>`
    : "";
  const cvNote = input.cv
    ? `<p><em>CV attached: ${escape(input.cv.filename)}</em></p>`
    : "";

  return `
    <h2>New Job Application</h2>
    <p><strong>Position:</strong> ${position}</p>
    <p><strong>Name:</strong> ${escape(input.name)}</p>
    <p><strong>Email:</strong> ${escape(input.email)}</p>
    ${phoneRow}
    ${linkedinLink}
    <p><strong>Cover Letter:</strong></p>
    <p>${nl2br(input.message)}</p>
    ${cvNote}
  `;
}

export function inquiryHtml(input: InquiryInput): string {
  const subjectRow = input.subject
    ? `<p><strong>Subject:</strong> ${escape(input.subject)}</p>`
    : "";

  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escape(input.name)}</p>
    <p><strong>Email:</strong> ${escape(input.email)}</p>
    ${subjectRow}
    <p><strong>Message:</strong></p>
    <p>${nl2br(input.message)}</p>
  `;
}

export function applicationSubject(input: ApplicationInput): string {
  return `New application for ${input.jobTitle || input.jobId}`;
}

export function inquirySubject(input: InquiryInput): string {
  return input.subject ? `Contact: ${input.subject}` : `New contact from ${input.name}`;
}
