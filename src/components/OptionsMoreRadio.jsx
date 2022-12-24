import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Paper, Stack } from '@mui/material';
import { React, useState } from 'react';
import { styled } from '@mui/material/styles';
const OptionsMoreRadio = (props) => {
    const { data } = props;
    const [valueSelected, setValueSelected] = useState("");
    const handleChange = (e) => {
        setValueSelected(e.target.value);
        console.log(valueSelected);
    }
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
                        name="position"
                        defaultValue="top"
                        value={valueSelected}
                        onChange={handleChange}
                        required

                    >
                        {
                            data?.variants?.map((item, key) => {
                                return (
                                    <FormControlLabel
                                        value={item?.id}
                                        control={
                                            <Radio
                                            // checked={selectedValue === 'a'}
                                            // onChange={handleChange}
                                            // value="a"
                                            // name="radio-buttons"
                                            // inputProps={{ 'aria-label': 'A' }}
                                            />
                                        }
                                        label={item?.name}
                                        labelPlacement="end"
                                    />
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
