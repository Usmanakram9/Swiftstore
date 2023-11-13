import jwt from 'jsonwebtoken'


const generatetoken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  // Set JWT as HTTP-Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
  });
}

export default generatetoken;