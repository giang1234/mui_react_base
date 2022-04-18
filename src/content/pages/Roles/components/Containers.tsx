import { connect } from 'react-redux';
import { actions, selectors } from '../../../../store/accounts';
import Main from '.';

const mapStateToProps = (state: any) => ({
  roles: selectors.rolesSelector(state),
  pageSize: selectors.pageSizeSelector(state),
  page: selectors.pageIndexSelector(state),
  totalPage: selectors.totalPageSelector(state),
  rowCount: selectors.rowCountSelector(state),
});
const mapDispatchToProps = dispatch => ({
  init: async (params) => {
    return await Promise.all([
      dispatch(actions.listRoles(params)),
    ]);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
