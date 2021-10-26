// const { Unauthorized } = require('http-errors');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../models');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;

  const { path: tempDir, originalname } = req.file;

  // resize avatar
  await Jimp.read(tempDir).then(avatarImg => {
    // const filename = `${_id}.${avatarImg.getExtension()}`;
    // avatarImg.write(filename);
    return avatarImg.resize(250, 250).write(tempDir);
  });

  // rename avatar and write it the path to the folder avatars
  const [extention] = originalname.split('.').reverse();
  const filename = `${_id}.${extention}`;
  const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename);

  try {
    await fs.rename(tempDir, uploadDir);
    const image = path.join('avatars', filename);
    // find user by id and rewrite his avatar
    await User.findByIdAndUpdate({ _id }, { avatarURL: image }, { new: true });
    res.json({
      status: 'success',
      code: 200,
      message: 'User avatar updated',
      avatarURL: image,
    });
  } catch (error) {
    fs.unlink(tempDir);
    next(error);
  }
};

module.exports = updateAvatar;
