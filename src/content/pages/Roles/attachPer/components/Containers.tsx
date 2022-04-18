import { connect } from 'react-redux';
import { actions, selectors } from '../../../../../store/accounts';
import Main from './Index'

const mapStateToProps = (state: any) => ({
  permissions: selectors.permissionsSelector(state)
});
const mapDispatchToProps = dispatch => ({
  init: async (params) => {
    return await Promise.all([
      dispatch(actions.listPermissionsByRole(params)),
    ]);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
