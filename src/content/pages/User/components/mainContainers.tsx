import { connect } from 'react-redux';
import { actions, selectors } from '../../../../store/accounts';
import Main from './main';

const mapStateToProps = (state: any) => ({
    users: selectors.usersSelector(state),
    pageSize: selectors.pageSizeSelector(state),
    page: selectors.pageIndexSelector(state),
    totalPage: selectors.totalPageSelector(state),
    rowCount: selectors.rowCountSelector(state),
});
const mapDispatchToProps = dispatch => ({
    init: async () => {
        return await Promise.all([
            dispatch(actions.listUsers({})),
        ]);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
