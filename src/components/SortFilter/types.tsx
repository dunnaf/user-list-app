export interface Props {
  handleSearch: (keyword: string) => void;
  handleFilter: (gender: string) => void;
  handleReset: () => void;
}
