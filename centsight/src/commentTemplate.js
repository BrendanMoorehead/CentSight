
/**
 * Function Name: deleteAccount
 * Description: Delete an account from the database and remove all associated transactions.
 * Parameters:
 *   - account (object): The account to delete.
 * Returns:
 *   - Promise: A promise that resolves to the deleted account.
 * Side Effects:
 *   - Toast notification of success or failure.
 * Notes:
 *  - As set in the database, associated transactions are deleted when an account is deleted.
 */