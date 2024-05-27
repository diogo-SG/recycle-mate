export function Button({ children }: any) {
  return (
    <button
      type="button"
      className="text-white bg-secondary-900 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {children}
    </button>
  );
}

export function DisabledButton({ children }: any) {
	return (
		<button
			disabled
			type="button"
			className="text-white bg-secondary-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:focus:ring-blue-800"
		>
			{children}
		</button>
	);
}