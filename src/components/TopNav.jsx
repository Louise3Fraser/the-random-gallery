import Select from "react-select";

const customStyles = {
  control: (base) => ({
    ...base,
    display: "flex",
    backgroundColor: "transparent",
    border: "1px solid #333",
    borderRadius: "999px",
    fontFamily: "Marist, serif",
    color: "#ccc",
    boxShadow: "none", 
    height: "24px",
    minHeight: "24px",
    fontSize: "12px",
    lineHeight: "1",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 6,
    paddingRight: 6,
    display: "flex",
    cursor: "pointer",
    alignItems: "center", // ✅ center vertically
    "&:hover": {
      border: "1px solid #333 !important",
    //   fontStyle: "italic",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "7px",
    marginTop: "0px",
    zIndex: 9999,
    color: "#ccc"
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#222" : "#111",
    color: "#ccc",
    fontFamily: "Marist, serif",
    cursor: "pointer",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#ccc",
    padding: "0px",
    width: "10px",
  }),
  clearIndicator: (base) => ({ padding: "0px" }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: "999px",
    fontSize: "10px",
    margin: "0 2px",
    padding: "0 4px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "16px",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "#ccc",
    padding: 0,
    lineHeight: 1,
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: "#ccc",
    padding: "0 2px",
    fontSize: "10px",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
    marginLeft: 4,
    width: "12px", // adjust if needed
    justifyContent: "center",
    color: "#5c5b5b",
  }),

  indicatorContainer: (base) => ({
    ...base,
    padding: 0,
    margin: 0,
  }),
};

export default function TopNav({
  setSelectedItem,
  filters,
  setFilters,
  options,
}) {
  const handleClick = () => {
    setSelectedItem(null);
  };

  const handleFilterChange = (key, selectedOptions) => {
    setFilters((prev) => ({
      ...prev,
      [key]: selectedOptions.map((option) => option.value),
    }));
  };

  return (
    <div className="top-nav">
      <div className="nav-main">
        <span className="nav-title" onClick={handleClick}>
          The Random Gallery
        </span>
        <div className="filter-group">
          <Select
            isMulti
            isSearchable={false}
            options={options.category}
            className="filter-dropdown"
            placeholder="Category"
            components={{ ClearIndicator: null }}
            styles={customStyles}
            onChange={(selected) => handleFilterChange("category", selected)}
          />
          <Select
            isMulti
            isSearchable={false}
            components={{ ClearIndicator: null }}
            options={options.culture}
            className="filter-dropdown"
            placeholder="Culture"
            styles={customStyles}
            onChange={(selected) => handleFilterChange("culture", selected)}
          />
          <Select
            isMulti
            isSearchable={false}
            components={{ ClearIndicator: null }}
            options={options.color}
            className="filter-dropdown"
            placeholder="Color"
            styles={customStyles}
            onChange={(selected) => handleFilterChange("color", selected)}
          />
        </div>
      </div>
      <div className="top-line" />
    </div>
  );
}
