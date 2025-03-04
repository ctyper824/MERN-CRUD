import User from "../models/User.js";


export const editProfile = async (req, res) => {
    const userId = req.params.userId;
    const { fullname, email, phone } = req.body;

    try {
        if (userId !== req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { fullname, email, phone },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}