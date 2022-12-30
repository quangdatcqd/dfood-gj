import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Paper, Stack } from '@mui/material';
import { React, useState } from 'react';
import { styled } from '@mui/material/styles';
const OptionsMoreRadio = (props) => {
    const { data } = props;
    const [valueSelected, setValueSelected] = useState("");
    const handleChange = (e) => {
        setValueSelected(e.target.value);

    }
    // const onsubmit = (e) => {
    //     e.preventDefault();
    //     console.log(e)
    //     // e.target.map((item) => {
    //     //     setVariants(variants + item.value)
    //     // })
    // }
    // console.log(data);
    return (

        <Stack spacing={2}>
            <Item>
                <FormControl>
                    <FormLabel style={{ width: "100%", color: "black", fontWeight: "bold" }} id="demo-form-control-label-placement">
                        {data?.name}
                    </FormLabel>
                    <p style={{ width: "100%", color: "red", fontWeight: "bold" }}> <span style={{ float: "left" }}>{data?.rules?.selection?.required ? "Bắt buộc chọn*" : ""}</span> <span style={{ float: "right" }}>Chọn 1</span></p>
                    <RadioGroup
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name={data?.id}
                        defaultValue="top"
                        value={valueSelected}
                        onChange={handleChange}
                        required

                    >
                        {
                            data?.variants?.map((item, key) => {
                                var variant = JSON.stringify(
                                    {
                                        category_id: data?.id,
                                        category_name: data?.name,
                                        id: item?.id,
                                        name: item?.name,
                                    }
                                );
                                return (
                                    <div key={key} style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                                        <FormControlLabel
                                            value={variant}
                                            control={
                                                <Radio
                                                // checked={selectedValue === 'a'}
                                                // onChange={handleChange}
                                                // value="a"
                                                // name="radio-buttons"
                                                // inputProps={{ 'aria-label': 'A' }}
                                                />
                                            }
                                            label={item?.name + " - " + item?.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            labelPlacement="end"
                                        />

                                    </div>

                                )
                            })
                        }


                    </RadioGroup>

                </FormControl>
            </Item>
        </Stack>

    );
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default OptionsMoreRadio;
