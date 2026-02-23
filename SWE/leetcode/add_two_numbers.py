class ListNode(object):
    # python automatically ignores self
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# object is passed to deal with python 2 to access modern features stuff like super()
class Solution(object): 
    def addTwoNumbers(self, l1, l2):
        carry = 0 
        l1_current = l1 
        l1_list = []
        while l1_current:
            l1_list.append(l1_current.val)
            l1_current = l1_current.next 

        l2_current = l2 
        l2_list = []
        while l2_current:
            l2_list.append(l2_current.val)
            l2_current = l2_current.next  

        l1_list.reverse()
        l2_list.reverse()
        result = []

        index_dif = len(l1_list) - len(l2_list)
        if index_dif > 0: 
            l2_list += [0] * index_dif
        elif index_dif < 0: 
            l1_list += [0] * abs(index_dif)

        for i in range(len(l1_list)):
            total = l1_list[i] + l2_list[i] + carry
            result.append(total % 10)
            carry = total // 10 

        if carry:  
            result.append(1)

        # Convert result to LinkedList
        dummy = ListNode(0)
        current = dummy
        # gives you the items directly inside
        for val in result:
            current.next = ListNode(val)
            current = current.next

        return dummy.next