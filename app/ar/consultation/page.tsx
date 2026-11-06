import { redirect } from 'next/navigation';

// Keep old links working, but do not show a second embedded chatbot beside a form.
export default function Page() {
  redirect('/ar/request?service=other');
}
