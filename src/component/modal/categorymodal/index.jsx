import { Button, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import categoryService from "../../../../service/category";

const CategoryModal = ({ open, handleCancel, category, refreshData }) => {  
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
 
    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category.name, 
            });
        } else {
            form.resetFields(); // Reset fields when opening for a new category
        }
    }, [category, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        
        try {
            if (category?.id) {
                // Update category
                await categoryService.update(category.id, values);
                message.success("Category updated successfully");
            } else {
                // Create category
                await categoryService.create(values);
                message.success("Category created successfully");
            }
            refreshData(); // Refresh data after create/update
            handleCancel();
        } catch (error) {
            console.error(error);
            message.error("Failed to save category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            open={open} 
            title={category?.name ? "Edit Category" : "Create Category"} 
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                name="categoryForm"
                style={{ width: '100%', marginTop: '20px' }}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter the category name" }]}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item>
                    <Button
                        size="large"
                        style={{ width: "100%" }}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        {category?.name ? "Update" : "Add"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CategoryModal;
