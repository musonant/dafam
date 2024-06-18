export const getInputPropsFromFormik = (formik) => {
  const { values, handleBlur, handleChange } = formik;
  const props: Record<keyof typeof values, {}> = {};
  const keys = Object.keys(values);
  keys.forEach((key) => {
    props[key] = {
      name: key,
      value: values[key],
      onBlur: handleBlur(key),
      onChangeText: handleChange(key),
    };
  });
  return props;
};
