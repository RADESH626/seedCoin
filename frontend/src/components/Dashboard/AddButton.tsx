import { Plus } from 'lucide-react';

export default function AddButton() {
    return (
        <button className="w-full bg-primary text-white py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-primary-hover transition-all flex items-center justify-center gap-2 group">
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-lg">Agregar Transacción</span>
        </button>
    );
}
