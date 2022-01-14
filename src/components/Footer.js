export default function Footer() {
  return (
    <footer className="mt-auto grid grid-cols-1 place-items-center text-green-500 py-3 md:py-4 lg:py-6">
      <div className="">&copy; {`Copyright ${new Date().getFullYear()}`}</div>
    </footer>
  );
}
