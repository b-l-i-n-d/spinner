import { useSpinnerContext } from "../../context/spinner-context";
import { useUserContext } from "../../context/user-context";
import styles from "./user-details.module.scss";

export const UserDetails = () => {
    const { spinnerData } = useSpinnerContext();
    const { users } = useUserContext();

    return (
        <div className={styles.userDetails}>
            <h2 className={styles.header}>User Details</h2>

            {/* User Table */}

            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        spinnerData.find(
                                            (data) =>
                                                data.id === user.discountId
                                        )?.discount
                                    }
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td align="center" colSpan={3}>
                                No User Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
