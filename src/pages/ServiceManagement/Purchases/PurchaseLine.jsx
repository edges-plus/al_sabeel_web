import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@mui/material";
import FormAutoComplete from "@components/FormAutoComplete";
import FormTextField from "@components/FormTextField";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import useDebouncedSearch from "@root/utils/useDebouncedSearch";
// import { getToolOptions } from "@root/redux/actions/toolConsumableActions"; 
import { useDispatch } from "react-redux";

const mockToolOptions = [
  { id: 1, name: "Hammer" },
  { id: 2, name: "Wrench" },
  { id: 3, name: "Screwdriver" },
  { id: 4, name: "Pliers" },
  { id: 5, name: "Drill Machine" },
];

const PurchaseLine = ({
  idx,
  line,
  onChange,
  onRemove,
  disableRemove,
  errorName,
  errorQty,
  errorPrice,
}) => {
  const dispatch = useDispatch();
  const [toolOptions, setToolOptions] = useState(mockToolOptions);

  const debouncedSearch = useDebouncedSearch((value) => {
    // dispatch(getToolOptions({ search: value })).then((action) => {
    //   if (action?.payload?.options) {
    //     setToolOptions(action.payload.options);
    //   }
    // });

    // Simple mock search filter
    const filtered = mockToolOptions.filter((tool) =>
      tool.name.toLowerCase().includes(value.toLowerCase())
    );
    setToolOptions(filtered);
  }, 400);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText]);

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        bgcolor: "#fafbfc",
        borderRadius: 2,
        p: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Grid size={{ md: 1, xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontWeight: 600 }}>{idx + 1}</span>
      </Grid>
      <Grid size={{ md: 5, xs: 12 }}>
        <FormAutoComplete
          label="Item Name"
          value={line.name}
          options={toolOptions}
          getOptionLabel={(option) => option?.name || ""}
          onInputChange={(e, value) => setSearchText(value)}
          onChange={(e, value) => onChange(idx, "name", value)}
          errorText={errorName}
        />
      </Grid>
      <Grid size={{ md: 2, xs: 6 }}>
        <FormTextField
          label="Quantity"
          type="number"
          value={line.quantity}
          onChange={(e) => onChange(idx, "quantity", e.target.value)}
          errorText={errorQty}
        />
      </Grid>
      <Grid size={{ md: 2, xs: 6 }}>
        <FormTextField
          label="Price"
          type="number"
          value={line.price}
          onChange={(e) => onChange(idx, "price", e.target.value)}
          errorText={errorPrice}
        />
      </Grid>
      <Grid size={{ md: 1, xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          color="error"
          onClick={() => onRemove(idx)}
          disabled={disableRemove}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PurchaseLine;
