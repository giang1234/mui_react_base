import { connect } from 'react-redux';
import { actions, selectors } from '../../../../store/accounts';
import Main from '.';

const mapStateToProps = (state: any) => ({
  roles: selectors.rolesSelector(state)
});
const mapDispatchToProps = dispatch => ({
  init: async (params) => {
    return await Promise.all([
      dispatch(actions.GetRoleById(params)),
    ]);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
