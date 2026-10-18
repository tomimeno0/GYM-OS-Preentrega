import { loadUser, publicUser } from './accounts.controller.js';
import { assert } from './errors.controller.js';

export async function authorizeActor(id, permission, transaction) {
  const user = await loadUser(id, transaction);
  assert(user?.estado === 'activo', 401, 'ACCOUNT_DISABLED', 'La cuenta no está habilitada.');
  assert(
    !permission || publicUser(user).permisos.includes(permission),
    403,
    'FORBIDDEN',
    'No tenés permiso para esta acción.',
  );
  return user;
}
