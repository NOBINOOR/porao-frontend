import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { token, user } = useSelector(
        (state) => state.user
    );
    return token ? children : <Navigate to="/auth/student/login" />
};

