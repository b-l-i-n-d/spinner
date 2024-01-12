import styles from "./user-details.module.scss";

export const UserDetails = () => {
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
                    <tr>
                        <td>John Doe</td>
                        <td>johndoe@gmail.com</td>
                        <td>10%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
