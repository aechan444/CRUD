export const updateExam = (req: Request, res: Response) => {
    try {
        const examId = parseInt(req.params.id);
        const { subject, date, duration } = req.body;

        // Find the exam in the array
        const examIndex = exams.findIndex((exam) => exam.id === examId);

        if (examIndex === -1) {
            return res.status(404).json({ message: "Exam not found" });
        }

        // Update only provided fields
        if (subject) exams[examIndex].subject = subject;
        if (date) exams[examIndex].date = date;
        if (duration) exams[examIndex].duration = duration;

        res.json({ message: "Exam updated successfully", exam: exams[examIndex] });
    } catch (error) {
        console.error("Error updating exam:", error);
        res.status(500).json({ message: "An error occurred while updating the exam" });
    }
};
