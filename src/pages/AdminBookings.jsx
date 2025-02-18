import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import moment from 'moment';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/bookings/getallbookings');
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      toast.success('Booking deleted successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to delete booking');
    }
  };

  const showDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: ['user', 'username'],
      key: 'user'
    },
    {
      title: 'Car',
      dataIndex: ['car', 'name'],
      key: 'car'
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (text) => moment(text).format('LLL')
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (text) => moment(text).format('LLL')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button danger onClick={() => showDeleteModal(record)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <h1 className='m-4 text-3xl '>Manage Bookings</h1>
      <Table 
        dataSource={bookings}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />

      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={() => {
          handleDelete(selectedBooking._id);
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to delete this booking?</p>
      </Modal>
    </div>
  );
};

export default AdminBookings;
