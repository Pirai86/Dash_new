import React from "react";
import { useState, useRef } from "react";
import { default as ReactSelect, components, InputAction } from "react-select";
import "../Styles/MultiSelect.css";

export type Option = {
  value: number | string;
  label: string;
};

const MultiSelect = (props: any) => {
  const [selectInput, setSelectInput] = useState<string>("");
  const isAllSelected = useRef<boolean>(false);
  const selectAllLabel = useRef<string>("Select all");
  const allOption = { value: "*", label: selectAllLabel.current };

  // Initialize options and value as empty arrays if they are null or undefined
  const options = props.options || [];
  const value = props.value || [];  

  const filterOptions = (options: Option[], input: string) =>
    options.filter(({ label }: Option) =>
      label ? label.toLowerCase().includes(input.toLowerCase()) : false
    );
  
  const comparator = (v1: Option, v2: Option) =>
    (v1.value as number) - (v2.value as number);

  let filteredOptions = filterOptions(options, selectInput);
  let filteredSelectedOptions = filterOptions(value, selectInput);

  const Option = (props: any) => (
    <components.Option {...props}>
      <div className="multi-select-option">
        {props.value === "*" &&
        !isAllSelected.current &&
        filteredSelectedOptions.length > 0 ? (
          <input
            key={props.value}
            type="checkbox"
            ref={(input) => {
              if (input) input.indeterminate = true;
            }}
          />
        ) : (
          <input
            key={props.value}
            type="checkbox"
            checked={props.isSelected || isAllSelected.current}
            onChange={() => {}}
          />
        )}
        <label style={{ marginLeft: "5px" }}>{props.label}</label>
      </div>
    </components.Option>
  );

  const Input = (props: any) => (
    <>
      {selectInput.length === 0 ? (
        <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
          {props.children}
        </components.Input>
      ) : (
        <div style={{ border: "1px dotted gray" }}>
          <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
            {props.children}
          </components.Input>
        </div>
      )}
    </>
  );

  const customFilterOption = ({ value, label }: Option, input: string) =>
    (value !== "*" && label.toLowerCase().includes(input.toLowerCase())) ||
    (value === "*" && filteredOptions.length > 0);

  const onInputChange = (
    inputValue: string,
    event: { action: InputAction }
  ) => {
    if (event.action === "input-change") setSelectInput(inputValue);
    else if (event.action === "menu-close" && selectInput !== "")
      setSelectInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.key === " " || e.key === "Enter") && !selectInput)
      e.preventDefault();
  };

  const handleChange = (selected: Option[]) => {
    if (selected.some((opt) => !opt.label)) {
      //console.error("Some options are missing labels", selected);
      return;
    }
    if (
      selected.length > 0 &&
      !isAllSelected.current &&
      (selected[selected.length - 1].value === allOption.value ||
        JSON.stringify(filteredOptions) ===
          JSON.stringify(selected.sort(comparator)))
    )
      return props.onChange(
        [
          ...(value ?? []),
          ...options.filter(
            ({ label }: Option) =>
              label.toLowerCase().includes(selectInput?.toLowerCase()) &&
              (value ?? []).filter((opt: Option) => opt.label === label)
                .length === 0
          ),
        ].sort(comparator)
      );
    else if (
      selected.length > 0 &&
      selected[selected.length - 1].value !== allOption.value &&
      JSON.stringify(selected.sort(comparator)) !==
        JSON.stringify(filteredOptions)
    )
      return props.onChange(selected);
    else
      return props.onChange([
        ...value?.filter(
          ({ label }: Option) =>
            !label.toLowerCase().includes(selectInput?.toLowerCase())
        ),
      ]);
  };

  const customStyles = {
    multiValueLabel: (def: any) => ({
      ...def,
      backgroundColor: "lightgray",
    }),
    multiValueRemove: (def: any) => ({
      ...def,
      backgroundColor: "lightgray",
    }),
    valueContainer: (base: any) => ({
      ...base,
      maxHeight: "65px",
      overflow: "auto",
    }),
    option: (styles: any, { isSelected, isFocused }: any) => {
      return {
        ...styles,
        backgroundColor:
          isSelected && !isFocused
            ? null
            : isFocused && !isSelected
            ? styles.backgroundColor
            : isFocused && isSelected
            ? "#DEEBFF"
            : null,
        color: isSelected ? null : null,
        fontSize: "12px", // Set your desired font size here
      };
    },
    menu: (def: any) => ({ ...def, zIndex: 9999 }),
    control: (base: any) => ({
      ...base,
      fontSize: "12px", // Set your desired font size here
    }),
  };

  if (props.isSelectAll && options.length !== 0) {
    isAllSelected.current =
      JSON.stringify(filteredSelectedOptions) ===
      JSON.stringify(filteredOptions);

    if (filteredSelectedOptions.length > 0) {
      if (filteredSelectedOptions.length === filteredOptions.length)
        selectAllLabel.current = `All (${filteredOptions.length}) selected`;
      else
        selectAllLabel.current = `${filteredSelectedOptions.length} / ${filteredOptions.length} selected`;
    } else selectAllLabel.current = "Select all";

    allOption.label = selectAllLabel.current;

    return (
      <ReactSelect
        {...props}
        inputValue={selectInput}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        options={[allOption, ...options]}
        onChange={handleChange}
        components={{
          Option: Option,
          Input: Input,
          ...props.components,
        }}
        filterOption={customFilterOption}
        menuPlacement={props.menuPlacement ?? "auto"}
        styles={customStyles}
        isMulti
        closeMenuOnSelect={false}
        tabSelectsValue={false}
        backspaceRemovesValue={true}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
      />
    );
  }

  return (
    <ReactSelect
      {...props}
      inputValue={selectInput}
      onInputChange={onInputChange}
      filterOption={customFilterOption}
      components={{
        Input: Input,
        ...props.components,
      }}
      menuPlacement={props.menuPlacement ?? "auto"}
      onKeyDown={onKeyDown}
      tabSelectsValue={false}
      hideSelectedOptions={true}
      backspaceRemovesValue={true}
      blurInputOnSelect={true}
    />
  );
};

export default MultiSelect;
