import {accountTypeEnum} from '../enums/accountType.enum.js';
const authorize = (roles = Object.values(accountTypeEnum)) => (req, res, next) => {
  // const account = await Account.findById(req.user._id);
  if(!req.user) return res.redirect('/login')
  if (roles && !roles.includes(req.user.role)) {
    return res.redirect('/login');
  } if (!req.user.role) {
    return res.redirect('/login');
  }
  return next();
}
export {
  authorize,
}