import { useState } from "react";

export function useSelection(items: any[]) {
  const [selection, setSelection] = useState<string[]>([]);
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  function handleClearSelection() {
    setSelection([]);
  }

  function handleCheckedChange(changes: any) {
    setSelection(changes.checked ? items.map((item) => item._id) : []);
  }

  function handleSingleCheckboxChecked(changes: any, item: any) {
    setSelection((prev) =>
      changes.checked
        ? [...prev, item._id]
        : selection.filter((id) => id !== item._id)
    );
  }
  return {
    selection,
    hasSelection,
    indeterminate,
    handleClearSelection,
    handleCheckedChange,
    handleSingleCheckboxChecked,
  };
}
