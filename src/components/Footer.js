export default function Footer() {
  return (
    <footer className="mt-auto bg-stone-800 grid grid-cols-1 place-items-center text-stone-100 py-3 md:py-4 lg:py-6">
      <div className="">&copy; {`Copyright ${new Date().getFullYear()}`}</div>
    </footer>
  );
}
