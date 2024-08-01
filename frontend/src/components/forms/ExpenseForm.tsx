import { useFormik } from 'formik';
import { Button, Card, Checkbox, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import { useUsersActions } from '../../hooks/useUsersActions';
import { CredentialsExpense, User } from '../../models/types';
import { useNavigate } from 'react-router-dom';

export default function ExpenseForm(): JSX.Element {
  const { myUser, users } = useUsersActions();
  const navigate = useNavigate()
  const sortedUsers = [...users].sort((a, b) => {
    if (a.user_id === myUser.user_id) return -1;
    if (b.user_id === myUser.user_id) return 1;
    return 0;
  });

  const allPayment = () => {
    return users.reduce((total: number, user: User) => {
      return total + user.quantity_pay;
    }, 0);
  };

  const dividedPayment = () => {
    return allPayment() > 0 ? allPayment() / users.length : 0
  };

  const formik = useFormik<CredentialsExpense>({
    initialValues: {
      selectedUsers: [],
      paymentOption: 'selected',
    },
    onSubmit: (values) => {
      if (values.paymentOption === 'divided') {
        console.log({ proportion: 'divided', peer_list: [] });
      } else if (values.paymentOption === 'all') {
        console.log({ proportion: 'all', peer_list: [] });
      } else {
        console.log({ proportion: 'selected', peer_list: values.selectedUsers });
      }
      if(myUser.order_list?.length === 0 && myUser.quantity_pay === 0) {
        navigate('/survey')
      }
    },
  });

  const handleCheckboxChange = (user: User) => {
    const selected = formik.values.selectedUsers.some(u => u.username === user.username);
    let newSelectedUsers;
    if (selected) {
      newSelectedUsers = formik.values.selectedUsers.filter(u => u.username !== user.username);
    } else {
      newSelectedUsers = [...formik.values.selectedUsers, user];
    }
    formik.setFieldValue('selectedUsers', newSelectedUsers);
    if (newSelectedUsers.length > 0) {
      formik.setFieldValue('paymentOption', '');
    }
  };

  const handlePaymentOptionChange = (option: 'divided' | 'all') => {
    formik.setFieldValue('paymentOption', option);
    formik.setFieldValue('selectedUsers', []);
  };

  const isSubmitDisabled = !formik.values.paymentOption && formik.values.selectedUsers.length === 0;

  return (
    <form onSubmit={formik.handleSubmit} className='min-w-[90%] min-h-full'>
      <Card className='min-w-full mt-3 mb-6'>
        <List className='min-w-full'>
          {sortedUsers.map((user) => (
            <ListItem key={user.username} className='p-0'>
              <label className='flex items-center justify-between min-w-full'>
                <ListItemPrefix className='mr-0'>
                  <Checkbox
                    crossOrigin="false"
                    checked={formik.values.selectedUsers.some(u => u.username === user.username)}
                    onChange={() => handleCheckboxChange(user)}
                    name={user.username}
                    label={user.username}
                  />
                </ListItemPrefix>
                    <Typography variant='paragraph' color='black' className='pr-2'>
                      $ {user.quantity_pay.toFixed(2)}
                    </Typography>
              </label>
            </ListItem>
          ))}
        </List>
      </Card>
      <Card className='min-w-full'>
        <List className='min-w-full'>
          <ListItem className='p-0'>
            <label className='flex items-center justify-between min-w-full'>
              <ListItemPrefix>
                <Checkbox
                  crossOrigin="false"
                  id="divided"
                  name="paymentOption"
                  label='Dividir en partes iguales'
                  onChange={() => handlePaymentOptionChange('divided')}
                  checked={formik.values.paymentOption === 'divided'}
                  disabled={formik.values.selectedUsers.length > 0}
                />
              </ListItemPrefix>
              <Typography variant='paragraph' color='black' className='font-semibold pr-2'>
                $ {dividedPayment().toFixed(2)}
              </Typography>
            </label>
          </ListItem>
          <ListItem className='p-0'>
            <label className='flex items-center justify-between min-w-full'>
              <ListItemPrefix>
                <Checkbox
                  crossOrigin="false"
                  id="all"
                  name="paymentOption"
                  label="Pagar el total de la mesa"
                  onChange={() => handlePaymentOptionChange('all')}
                  checked={formik.values.paymentOption === 'all'}
                  disabled={formik.values.selectedUsers.length > 0}
                />
              </ListItemPrefix>
              <Typography variant='paragraph' color='black' className='font-semibold pr-2'>
                $ {allPayment().toFixed(2)}
              </Typography>
            </label>
          </ListItem>
        </List>
      </Card>
      <div className="min-w-[90%] fixed bottom-[5.5rem] left-0 w-full z-40 px-5 bg-white pb-3">
        <Button type="submit" 
          variant="filled" 
          fullWidth 
          disabled={isSubmitDisabled}
          className="bg-[#787A00] h-[3rem] mb-3 disabled:bg-[gray]"
        >
          <Typography variant="h6">GENERAR FACTURA</Typography>
        </Button>
      </div>
    </form>
  );
}
