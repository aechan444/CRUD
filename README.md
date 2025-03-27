import { AppDataSource } from "../data-source";
import { Exam } from "../entities/Exam";
import { Request, Response } from "express";

const examRepository = AppDataSource.getRepository(Exam);

// UPDATE EXAM BY ID
export const updateExam = async (req: Request, res: Response) => {
    try {
        const examId = parseInt(req.params.id);
        const { name, date, subject } = req.body;

        // Check if the exam exists
        const exam = await examRepository.findOneBy({ id: examId });
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        // Update fields if provided
        if (name) exam.name = name;
        if (date) exam.date = date;
        if (subject) exam.subject = subject;

        await examRepository.save(exam);
        res.json({ message: "Exam updated successfully", exam });
    } catch (error) {
        res.status(500).json({ message: "Error updating exam", error: error.message });
    }
};
