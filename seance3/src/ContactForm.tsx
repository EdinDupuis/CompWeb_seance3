import { useState } from 'react';
import { z } from 'zod';

// 1️⃣ Schéma Zod
const contactSchema = z.object({
    name: z.string()
        .min(1, { message: 'Nom requis' })
        .min(2, { message: 'Au moins 2 caractères' }),

    email: z.string()
        .min(1, { message: 'Email requis' })
        .email(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{ message: 'Email invalide' }),

    phone: z.string()
        .min(1, { message: 'Téléphone requis' })
        .regex(/^0[1-9]\d{8}$/, { message: 'Téléphone invalide (10 chiffres)' }),

    message: z.string()
        .min(1, { message: 'Message requis' })
        .min(10, { message: 'Au moins 10 caractères' })
});

// 2️⃣ Type inféré automatiquement
type ContactFormData = z.infer<typeof contactSchema>;

function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Mise à jour des champs
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSubmitSuccess(false);
    };

    // Validation d’un seul champ (onBlur)
    const validateField = (name: keyof ContactFormData, value: string) => {
        const result = contactSchema
            .pick({ [name]: true })
            .safeParse({ [name]: value });

        setErrors(prev => ({
            ...prev,
            [name]: result.success
                ? ''
                : result.error.errors?.[0]?.message || 'Erreur'
        }));
    };

    // Vérifier si tout le formulaire est valide
    const isFormValid = () => {
        return contactSchema.safeParse(formData).success;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = contactSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach(err => {
                if (err.path[0]) {
                    fieldErrors[err.path[0].toString()] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        // ✅ Données validées
        console.log('Données valides:', result.data);

        setSubmitSuccess(true);
        setErrors({});

        // Reset
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={(e) => validateField('name', e.target.value)}
                    placeholder="Nom complet"
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={(e) => validateField('email', e.target.value)}
                    placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={(e) => validateField('phone', e.target.value)}
                    placeholder="Téléphone"
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div>
        <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={(e) => validateField('message', e.target.value)}
            placeholder="Message"
        />
                {errors.message && <span className="error">{errors.message}</span>}
            </div>

            <button type="submit" disabled={!isFormValid()}>
                Envoyer
            </button>

            {submitSuccess && (
                <p style={{ color: 'green' }}>
                    ✅ Message envoyé avec succès !
                </p>
            )}
        </form>
    );
}

export default ContactForm;

