import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Form, SearchFormButton, Field, ErrorText } from './SearchForm.styled';

const schema = yup.object().shape({
  query: yup
    .string()
    .max(40, 'Try making a shorter query')
    .lowercase()
    .required("You didn't enter anything!"),
});

const SearchForm = ({ onSubmitForm }) => {
  const handleSubmit = async (values, actions) => {
    await onSubmitForm(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ isSubmitting }) => (
        <Form>
          <SearchFormButton type="submit" disabled={isSubmitting}>
            <AiOutlineSearch size="25px" />
          </SearchFormButton>

          <Field
            type="text"
            name="query"
            placeholder="Search images and photos"
          />
          <ErrorMessage
            name="query"
            render={message => <ErrorText>{message}</ErrorText>}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;

SearchForm.propTypes = {
  onSubmitForm: PropTypes.func,
};
