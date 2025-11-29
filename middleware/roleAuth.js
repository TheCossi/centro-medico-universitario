export const isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') return res.status(403).json({ message: 'Acceso denegado' });
  next();
};

export const isRecepcionista = (req, res, next) => {
  if (!['admin', 'recepcionista'].includes(req.user.rol)) return res.status(403).json({ message: 'Acceso denegado' });
  next();
};

export const isMedico = (req, res, next) => {
  if (!['admin', 'recepcionista', 'medico'].includes(req.user.rol)) return res.status(403).json({ message: 'Acceso denegado' });
  next();
};