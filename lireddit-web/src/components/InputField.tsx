import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/core";
import { useField } from "formik";
import { InputHTMLAttributes } from "toasted-notes/node_modules/@types/react";
type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> & {
  name: string;
  label: string;
} = ({ label, size: _, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        id={field.name}
        // type={props.type ? props.type : "text"}
        {...props}
      />
      {error ?? <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
