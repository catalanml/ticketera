import Board, { IBoard } from '../models/Board';
import { CreateBoardInput, UpdateBoardInput } from '../validators/boardSchemas';
import { NotFoundError } from '../utils/errors'; // Assuming you have custom error classes

/**
 * Creates a new board.
 * @param data - Data for the new board.
 * @returns The newly created board document.
 */
export const createBoard = async (data: CreateBoardInput): Promise<IBoard> => {
    const board = new Board(data);
    await board.save();
    return board;
};

/**
 * Retrieves all boards.
 * @returns A list of all board documents.
 */
export const getAllBoards = async (): Promise<IBoard[]> => {
    return await Board.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
};

/**
 * Retrieves a single board by its ID.
 * @param id - The ID of the board to retrieve.
 * @returns The board document or null if not found.
 */
export const getBoardById = async (id: string): Promise<IBoard | null> => {
    const board = await Board.findById(id);
    if (!board) {
        throw new NotFoundError(`Board with ID ${id} not found`);
    }
    return board;
};

/**
 * Updates an existing board by its ID.
 * @param id - The ID of the board to update.
 * @param data - The data to update the board with.
 * @returns The updated board document or null if not found.
 */
export const updateBoard = async (id: string, data: UpdateBoardInput): Promise<IBoard | null> => {
    const board = await Board.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!board) {
        throw new NotFoundError(`Board with ID ${id} not found`);
    }
    return board;
};

/**
 * Deletes a board by its ID.
 * @param id - The ID of the board to delete.
 * @returns The deleted board document or null if not found.
 * @throws NotFoundError if the board is not found.
 */
export const deleteBoard = async (id: string): Promise<IBoard | null> => {
    // TODO: Consider what happens to tasks associated with this board.
    // Option 1: Delete tasks (cascade delete - potentially dangerous)
    // Option 2: Set boardId in tasks to null
    // Option 3: Prevent deletion if tasks exist
    // For now, just delete the board.
    const board = await Board.findByIdAndDelete(id);
    if (!board) {
        throw new NotFoundError(`Board with ID ${id} not found`);
    }
    // Add logic here to handle associated tasks if needed
    return board;
};
