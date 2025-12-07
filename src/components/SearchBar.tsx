interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search symbol..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch((e.target as HTMLInputElement).value);
        }
      }}
    />
  );
}
