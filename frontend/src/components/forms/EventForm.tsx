import { useState } from "react";
import type { Category, CampusEvent } from "../../types/campus-event";

interface EventFormProps {
    onSubmit: (formData: { title: string; category: Category; date: string; description: string }) => void;
    categories: Category[];
    initialData?: CampusEvent;
}

function EventForm({ onSubmit, categories, initialData }: EventFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [category, setCategory] = useState<Category | "">(initialData?.category || "");
    const [date, setDate] = useState(initialData?.date || "");
    const [description, setDescription] = useState(initialData?.description || "");

    return (
        <form 
            className="form" 
            onSubmit={(e) => { 
                e.preventDefault(); 
                if (!title || !category || !date) {
                    alert("Lütfen zorunlu alanları doldurun.");
                    return;
                }
                onSubmit({ 
                    title, 
                    category: category as Category, 
                    date, 
                    description 
                }); 
            }}
        >
            <label htmlFor="title">Etkinlik Adı</label>
            <input 
                id="title" 
                type="text" 
                maxLength={80} 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            
            <label htmlFor="cat">Kategori</label>
            <select 
                id="cat" 
                value={category} 
                onChange={(e) => setCategory(e.target.value as Category)} 
                required
            >
                <option value="">Seçiniz</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <label htmlFor="date">Tarih</label>
            <input 
                id="date" 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
            />

            <label htmlFor="desc">Açıklama</label>
            <textarea 
                id="desc" 
                rows={5} 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            
            <button type="submit">{initialData ? "Güncelle" : "Kaydet"}</button>
        </form>
    );
}

export default EventForm;