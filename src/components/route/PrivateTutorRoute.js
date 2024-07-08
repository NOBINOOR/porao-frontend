import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateTutorRoute({ children }) {
    const { token, user } = useSelector(
        (state) => state.user
    );
    return token ? children : <Navigate to="/auth/tutor/login" />
};
