import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Form, SearchFormButton, Field } from './SearchForm.styled';

const schema = yup.object().shape({
  query: yup
    .string()
    .max(40, 'Try making a shorter query')
    .lowercase()
    .required(),
});

const SearchForm = ({ onSubmitForm }) => {
  const handleSubmit = async (values, actions) => {
    await onSubmitForm(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <>
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
              render={message =>
                toast(`A problem occurred: ${message}`, { id: message })
              }
            />
          </Form>
        )}
      </Formik>
      <Toaster />
    </>
  );
};

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};
