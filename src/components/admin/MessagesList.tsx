
import { useState } from "react";
import { useProjects, Message } from "@/contexts/ProjectsContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Trash2, Mail, MailOpen } from "lucide-react";

const MessagesList = () => {
  const { messages, markMessageAsRead, deleteMessage } = useProjects();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsSheetOpen(true);
    
    // Mark as read if it's unread
    if (!message.read) {
      markMessageAsRead(message.id);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No messages yet
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">Message</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr 
                      key={message.id} 
                      className={`border-b last:border-b-0 ${!message.read ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-4 py-4">
                        {message.read ? (
                          <MailOpen className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Mail className="h-5 w-5 text-blue-500" />
                        )}
                      </td>
                      <td className="px-4 py-4 font-medium">{message.name}</td>
                      <td className="px-4 py-4 text-sm">{message.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                        {formatDate(new Date(message.createdAt))}
                      </td>
                      <td className="px-4 py-4 text-sm hidden md:table-cell">
                        <div className="line-clamp-1 max-w-xs">{message.content}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openMessage(message)}
                          >
                            View
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Message</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this message? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMessage(message.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        {selectedMessage && (
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Message from {selectedMessage.name}</SheetTitle>
              <SheetDescription>
                Received on {formatDate(new Date(selectedMessage.createdAt))}
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="space-y-1 mb-4">
                <p className="font-medium">From:</p>
                <p>{selectedMessage.name}</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="font-medium">Email:</p>
                <p>{selectedMessage.email}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Message:</p>
                <div className="border rounded-md p-4 bg-gray-50 whitespace-pre-wrap">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsSheetOpen(false)}
              >
                Close
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Message</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this message? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        deleteMessage(selectedMessage.id);
                        setIsSheetOpen(false);
                      }}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};

export default MessagesList;
